import ContactsList from "@/components/pages/contact-list/contacts-list";
import { RecentContacts } from "@/components/pages/contact-list/recent-contacts";

const ContactPage = () => {
  return (
    <>
      <RecentContacts />
      <ContactsList />
    </>
  );
};

export default ContactPage;
