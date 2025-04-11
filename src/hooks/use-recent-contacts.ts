import { MAX_RECENT, RECENT_CONTACTS_KEY } from "@/constants";
import { Contact } from "@/types/types";
import { useState, useEffect } from "react";

export const useRecentContacts = () => {
  const [recentContacts, setRecentContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(RECENT_CONTACTS_KEY);
    setRecentContacts(stored ? JSON.parse(stored) : []);
  }, []);

  const addRecentContact = (contact: Contact) => {
    setRecentContacts((prev) => {
      const updated = [
        contact,
        ...prev.filter((c) => c.id !== contact.id),
      ].slice(0, MAX_RECENT);
      localStorage.setItem(RECENT_CONTACTS_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return { recentContacts, addRecentContact };
};
