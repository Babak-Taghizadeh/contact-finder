import { useInfiniteContacts } from "@/hooks/use-infinite-contacts";
import ContactCard from "./contact-card";
import { useCallback, useRef } from "react";

const ContactsList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteContacts();

  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  const contacts = data?.pages.flatMap((page) => page.items) || [];
  if (status === "pending") {
    return <div>Loading initial data...</div>;
  }

  if (status === "error") {
    return <div>Error loading contacts</div>;
  }
  return (
    <div className="contacts-container">
      {contacts.map((contact, index) => {
        return (
          <div
            ref={index === contacts.length - 1 ? lastElementRef : null}
            key={`${contact.id}-${index}`}
          >
            <ContactCard contact={contact} />
          </div>
        );
      })}
      {isFetchingNextPage && <div>Loading more contacts...</div>}
    </div>
  );
};

export default ContactsList;
