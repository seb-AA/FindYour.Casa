import getListingById from "@/app/actions/getListingById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import Navbar from "@/app/components/navbar/Navbar";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const { listingId } = params;

  if (!listingId) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  const listing = await getListingById(listingId);
  const reservations = await getReservations({ listingId });
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        currentUser={currentUser}
        reservations={reservations}
      />
      <Navbar currentUser={currentUser} />
    </ClientOnly>
  );
};

export default ListingPage;
