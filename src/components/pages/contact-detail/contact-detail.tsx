import { useGetRequest } from "@/hooks/use-get-request";
import { useParams } from "react-router-dom";
import { Contact } from "@/types/types";
import "./contact-detail.scss";

const ContactDetail = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: contact,
    isLoading,
    error,
  } = useGetRequest<Contact>(["contact", id ?? ""], "passenger/:id", {
    pathVariables: { id: id ?? "" },
  });

  if (isLoading)
    return <div className="loading-spinner">Loading contact...</div>;
  if (error) return <div className="error-message">Error loading contact</div>;
  if (!contact) return <div className="not-found">Contact not found</div>;

  return (
    <div className="contact-detail-container">
      <div className="contact-detail-container__header">
        <div className="avatar-container">
          {contact.avatar ? (
            <img
              src={contact.avatar}
              alt={`${contact.first_name} ${contact.last_name}`}
              className="contact-avatar"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <div className="avatar-fallback">
              {contact.first_name.charAt(0)}
              {contact.last_name.charAt(0)}
            </div>
          )}
        </div>

        <div className="contact-title">
          <h1>
            {contact.first_name} {contact.last_name}
          </h1>
          <p className="contact-meta">
            <span className="gender-badge">{contact.gender}</span>
            {contact.company && (
              <span className="company-badge">{contact.company}</span>
            )}
          </p>
        </div>
      </div>
      <div className="contact-detail-container__body">
        <section className="contact-section">
          <h2>Contact Information</h2>
          <div className="contact-info-grid">
            <div className="info-item">
              <span className="info-label">Phone:</span>
              <span className="info-value">{contact.phone}</span>
            </div>
            {contact.email && (
              <div className="info-item">
                <span className="info-label">Email:</span>
                <p className="info-value link">{contact.email}</p>
              </div>
            )}
            {contact.telegram && (
              <div className="info-item">
                <span className="info-label">Telegram:</span>
                <span className="info-value">@{contact.telegram}</span>
              </div>
            )}
          </div>
        </section>

        {contact.address && (
          <section className="contact-section">
            <h2>Address</h2>
            <p className="address-text">{contact.address}</p>
          </section>
        )}

        <section className="contact-section">
          <h2>Member Since</h2>
          <p>{new Date(contact.createdAt).toLocaleDateString()}</p>
        </section>

        {contact.note && (
          <section className="contact-section notes-section">
            <h2>Notes</h2>
            <p className="note-text">{contact.note}</p>
          </section>
        )}
      </div>
    </div>
  );
};

export default ContactDetail;
