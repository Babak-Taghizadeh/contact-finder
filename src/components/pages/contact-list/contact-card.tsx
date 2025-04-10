import { Link } from "react-router-dom";
import { Contact } from "@/types/types";
import "./contact-list.scss";
import { memo } from "react";

interface ContactCardProps {
  contact: Contact;
}

const ContactCard = ({ contact }: ContactCardProps) => {
  const handleInteraction = () => {
    console.log("test");
  };

  return (
    <Link
      to={`/contacts/${contact.id}`}
      className="contact-card"
      onClick={handleInteraction}
    >
      <div className="contact-card__avatar">
        {contact.avatar ? (
          <img src={contact.avatar} alt={`${contact.first_name}'s avatar`} />
        ) : (
          <span>
            {contact.first_name.charAt(0)}
            {contact.last_name.charAt(0)}
          </span>
        )}
      </div>
      <div className="contact-card__info">
        <h3>
          {contact.first_name} {contact.last_name}
        </h3>
        <p className="phone">{contact.phone}</p>
        {contact.company && <p className="company">{contact.company}</p>}
      </div>
    </Link>
  );
};

export default memo(ContactCard);
