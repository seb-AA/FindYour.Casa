import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import { Listing, Reservation, User } from "@prisma/client";
import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps {
  data: {
    id: number;
    name: string;
    description: string;
    notes?: string;
    extractedInfo?: string;
    image?: string;
    link?: string;
  };
  reservation?: Reservation;
  onAction?: (id: string) => void;
  onEdit?: (listing: Listing) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: User | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  onEdit,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}) => {
  const router = useRouter();

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  const handleEdit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onEdit?.(data as unknown as Listing);
    },
    [onEdit, data]
  );

  return (
    <div
      onClick={() => router.push(`/items/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
        >
          <Image
            fill
            priority
            sizes="100%"
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
            src={data.image || "/placeholder-image.jpg"}
            alt="Item"
          />
          <div
            className="
            absolute
            top-3
            right-3
          "
          >
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
        {onEdit && (
          <Button
            small
            label="Edit"
            onClick={handleEdit}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
