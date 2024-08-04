import { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { I18nProvider } from "./src/_metronic/i18n/i18nProvider";
import {
  LayoutProvider,
  LayoutSplashScreen,
} from "./src/_metronic/layout/core";
import { MasterInit } from "./src/_metronic/layout/MasterInit";
import { AuthInit } from "./src/modules/auth";
import { ThemeModeProvider } from "./src/_metronic/partials";
import { toast } from "react-toastify";
import socket from "./src/services/sockets";
import { useGetTicketsQuery } from "./src/features/tickets";
import baseApi from "./src/features/baseApi";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const { data: ticketApiResponse, refetch: refetchTicket } =
    useGetTicketsQuery({});

  useEffect(() => {
    socket.emit("join", "support");

    const handleTicketResponse = (ticketResponse: any) => {
      console.log("Ticket Response Event:", ticketResponse);
      toast("New response on client ticket");
      dispatch(
        baseApi.util.invalidateTags([
          { type: "TicketResponse", id: `LIST-${ticketResponse?._id}` },
        ])
      );
    };

    const handleNewTicket = (ticket: any) => {
      console.log(ticket);
      toast("A new ticket has been submitted");
      dispatch(baseApi.util.invalidateTags([{ type: "Ticket", id: "LIST" }]));
    };

    socket.on("new-ticket", handleNewTicket);
    socket.on(`new-ticket-response`, handleTicketResponse);

    return () => {
      socket.off("new-ticket", handleNewTicket);
      socket.off(`new-ticket-response`, handleTicketResponse);
    };
  }, []);
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <I18nProvider>
        <LayoutProvider>
          <ThemeModeProvider>
            <Outlet />
            <MasterInit />
          </ThemeModeProvider>
        </LayoutProvider>
      </I18nProvider>
    </Suspense>
  );
};

export { App };
