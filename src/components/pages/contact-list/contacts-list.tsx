import "./contact-list.scss";
import { useInfiniteContacts } from "@/hooks/use-infinite-contacts";
import ContactCard from "./contact-card";
import { useCallback, useEffect, useRef } from "react";
import { throttle } from "lodash-es";

const ContactsList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteContacts();

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
