import getListingById from "@/app/actions/getListingById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const { listingId } = params;

  if (!listingId) {
    return (
      <ClientOnly>
        <EmptyState title="Invalid Listing" subtitle="Listing ID is required." />
      </ClientOnly>
    );
  }

  const numericListingId = Number(listingId);

  if (isNaN(numericListingId)) {
    return (
      <ClientOnly>
        <EmptyState title="Invalid Listing" subtitle="Listing ID is invalid." />
      </ClientOnly>
    );
  }

  try {
    const listing = await getListingById(listingId);
    const reservations = await getReservations({ listingId: numericListingId });
    const currentUser = await getCurrentUser();

    if (!listing) {
      return (
        <ClientOnly>
          <EmptyState title="Listing Not Found" subtitle="The listing does not exist." />
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
      </ClientOnly>
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return (
      <ClientOnly>
        <EmptyState title="Something went wrong" subtitle={errorMessage} />
      </ClientOnly>
    );
  }
};

export default ListingPage;
