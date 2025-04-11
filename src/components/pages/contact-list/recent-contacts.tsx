import { useRecentContacts } from "@/hooks/use-recent-contacts";
import RecentContactCard from "./recent-contact-card";

export const RecentContacts = () => {
  const { recentContacts } = useRecentContacts();

  if (recentContacts.length === 0) return null;

  return (
    <div className="recent-contacts">
      <h2 className="recent-contacts__title">Recently Visited</h2>
      <div className="recent-contacts__grid">
        {recentContacts.map((contact) => (
          <RecentContactCard key={contact.id} contact={contact} />
        ))}
      </div>
    </div>
  );
};
