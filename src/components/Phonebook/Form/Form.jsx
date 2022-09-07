import React, { useState, useMemo } from "react";
import { nanoid } from 'nanoid/non-secure'
import { useAddContactMutation, useGetContactsQuery } from "../../../redux/api";
import Input from "../Input/Input";
import Label from "../Label/Label";
import css from "./Form.module.css";

const Form = () => {
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");

    const nameInputId = useMemo(() => nanoid(), []);
    const numberInputId = useMemo(() => nanoid(), []);

    const { data: contacts } = useGetContactsQuery();
    const [addContact, { isLoading }] = useAddContactMutation();

    const formReset = () => {
        setName("");
        setNumber("");
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const newContact = {
            name: name,
            number: number
        }

        contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase()) ?
            alert(`${name} is already in contacts`) :
            (addContact(newContact));
        formReset();
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case "name":
                setName(value);
                break;
            case "number":
                setNumber(value);
                break;
            default:
                return;
        }
    }

    return (
            <>
            <h1 className={css.mainTitle}>Phonebook</h1>
            <form className={css.form} onSubmit={handleSubmit}>
                <Label text="Name" htmlFor={nameInputId}>
                    <Input type="text" id={nameInputId} name="name" pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$" title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan" value={name} onChange={handleChange} />
                </Label>
                <Label text="Number" htmlFor={numberInputId}>
                    <Input type="tel" name="number" id={numberInputId} pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}" title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +" value={number} onChange={handleChange} />
                </Label>
                <button className={css.formButton} type="submit" disabled={isLoading}>Add</button>
            </form>
            </>
        )
}

export default Form;