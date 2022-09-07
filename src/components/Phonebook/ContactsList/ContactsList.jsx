import PropTypes from "prop-types";
import { useSelector } from 'react-redux';
import { getFilter } from '../../../redux/slicer';
import Filter from "../Filter/Filter";
import css from "./ContactsList.module.css";
import { useDeleteContactMutation } from "../../../redux/api";

const ContactsList = ({ contacts }) => {
    console.log(contacts);
    
    const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();

    const filter = useSelector(getFilter);

    const filtredContact = () => {
    const normalizedFilter = filter.toLowerCase();
        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(normalizedFilter)
        );
    };

    const contactsList = filtredContact();
    
    return (
        <>
        <h2 className={css.title}>Contacts</h2>
        <Filter/>
        <ul className={css.list}>
        {contactsList.map(contact => (
            <li className={css.item} key={contact.id}>
            <span>{contact.name}:</span>
            <span>{contact.phone}</span>
            <button type="button" className={css.deleteButton} onClick={() => deleteContact(contact.id)}>{isDeleting ? 'Deleting...' : 'Delete'}</button>
            </li>
        ))}
        </ul>
        </>
    );
}

ContactsList.propTypes = {
    title: PropTypes.string,
}

export default ContactsList;