import { Link } from "react-router-dom";
import { Contact } from "@/types/types";
import { memo } from "react";

interface RecentContactCardProps {
  contact: Contact;
}

const RecentContactCard = ({ contact }: RecentContactCardProps) => {
  return (
    <Link to={`/contacts/${contact.id}`} className="recent-contact-card">
      <div className="recent-contact-card__avatar">
        {contact.avatar ? (
          <img
            src={contact.avatar}
            alt={`${contact.first_name}'s avatar`}
            className="recent-contact-avatar"
          />
        ) : (
          <span className="recent-avatar-fallback">
            {contact.first_name.charAt(0)}
            {contact.last_name.charAt(0)}
          </span>
        )}
      </div>
      <div className="recent-contact-card__info">
        <h4>
          {contact.first_name} {contact.last_name}
        </h4>
        <p className="recent-contact-meta">
          {contact.company && <span>{contact.company}</span>}
        </p>
      </div>
    </Link>
  );
};

export default memo(RecentContactCard);
