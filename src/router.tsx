import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ContactListPage from "./pages/contact-list-page";
import ContactDetailPage from "./pages/contact-detail-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <ContactListPage />,
      },
      {
        path: "contacts/:id",
        element: <ContactDetailPage />,
      },
    ],
  },
]);
