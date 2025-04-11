import "./contact-list.scss";
import { useInfiniteContacts } from "@/hooks/use-infinite-contacts";
import ContactCard from "./contact-card";
import { useCallback, useEffect, useRef, useState } from "react";
import SearchField from "./search-field";

import { throttle } from "lodash-es";

const ContactsList = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteContacts({ searchQuery });

  const throttledFetch = useCallback(
    throttle(() => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }, 500),
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    return () => {
      throttledFetch.cancel();
    };
  }, [throttledFetch]);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            throttledFetch();
          }
        },
        {
          rootMargin: "200px",
        }
      );

      if (node) observer.current.observe(node);
    },
    [throttledFetch, isFetchingNextPage]
  );
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
