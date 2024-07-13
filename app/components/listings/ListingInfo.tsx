"use client";

import React from "react";
import { User } from "@prisma/client";

interface ListingInfoProps {
  user: User;
  description: string;
  notes?: string | null;
  extractedInfo?: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  notes,
  extractedInfo,
}) => {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div>{description}</div>
      <hr />
      <div>
        <span className="font-semibold">Posted by:</span> {user.name}
      </div>
      {extractedInfo && (
        <div>
          <span className="font-semibold">Extracted Info:</span> {extractedInfo}
        </div>
      )}
      {notes && (
        <div>
          <span className="font-semibold">Notes:</span> {notes}
        </div>
      )}
    </div>
  );
};

export default ListingInfo;
