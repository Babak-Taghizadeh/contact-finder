import ContactCard from "./contact-card";

const ContactsList = () => {
  return (
    <div className="contacts-container">
      <ContactCard
        contact={{
          address: "test",
          avatar: null,
          company: "test",
          createdAt: 1,
          email: "test",
          first_name: "test",
          gender: "test",
          id: 1,
          last_name: "test",
          note: "test",
          phone: "test",
          telegram: "test",
          updatedAt: 1,
        }}
      />
    </div>
  );
};

export default ContactsList;
