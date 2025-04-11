import "./contact-list.scss";
import { useInfiniteContacts } from "@/hooks/use-infinite-contacts";
import ContactCard from "./contact-card";
import { useState } from "react";
import SearchField from "./search-field";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";

const ContactsList = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteContacts({ searchQuery });

  const { lastElementRef } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  const contacts = data?.pages.flatMap((page) => page.items) || [];

  if (status === "pending") {
    return <div>Loading initial data...</div>;
  }

  if (status === "error") {
    return <div>Error loading contacts</div>;
  }

  return (
    <div className="contacts-wrapper">
      <h2>Contacts</h2>
      <SearchField onSearch={setSearchQuery} initialValue={searchQuery} />
      <div className="contacts-wrapper__grid">
        {contacts.map((contact, index) => (
          <div
            ref={index === contacts.length - 1 ? lastElementRef : null}
            key={`${contact.id}-${index}`}
          >
            <ContactCard contact={contact} />
          </div>
        ))}
        {isFetchingNextPage && <div>Loading more contacts...</div>}
        {contacts.length === 0 && !isFetchingNextPage && (
          <div className="no-results">
            {searchQuery
              ? "No matching contacts found"
              : "No contacts available"}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactsList;
