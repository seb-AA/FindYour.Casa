import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import fetch from "node-fetch";

const JINA_API_KEY = process.env.NEXT_PUBLIC_JINA_API_KEY;
const JINA_API_URL = "https://r.jina.ai/";

interface IListingParams {
  listingId?: string;
}

export async function PATCH(request: Request, { params }: { params: IListingParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;
  const data = await request.json();

  if (!listingId || typeof listingId !== "string") {
    console.error("Invalid ID:", listingId);
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const numericListingId = Number(listingId);

  if (isNaN(numericListingId)) {
    console.error("Invalid listingId format:", listingId);
    return NextResponse.json({ error: "Invalid listingId format" }, { status: 400 });
  }

  try {
    const {
      guestCount,
      roomCount,
      bathroomCount,
      price,
      numberOfOtherBuildings,
      numberOfHabitableBuildings,
      landSize,
      arableLandSize,
      latitude,
      longitude,
      agentWebsite,
      ...otherData
    } = data;

    let extractedInfo = null;

    if (agentWebsite) {
      try {
        const response = await fetch(`${JINA_API_URL}${agentWebsite}`, {
          method: "GET",
          headers: {
            "X-With-Generated-Alt": "true",
            Authorization: `Bearer ${JINA_API_KEY}`,
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          extractedInfo = responseData.content; // Adjust based on actual structure of response
        }
      } catch (error) {
        console.error("Error fetching data from Jina API:", error);
      }
    }

    const updateData = {
      ...otherData,
      guestCount: guestCount ? Number(guestCount) : undefined,
      roomCount: roomCount ? Number(roomCount) : undefined,
      bathroomCount: bathroomCount ? Number(bathroomCount) : undefined,
      price: price ? Number(price) : undefined,
      numberOfOtherBuildings: numberOfOtherBuildings ? Number(numberOfOtherBuildings) : undefined,
      numberOfHabitableBuildings: numberOfHabitableBuildings ? Number(numberOfHabitableBuildings) : undefined,
      landSize: landSize ? Number(landSize) : undefined,
      arableLandSize: arableLandSize ? Number(arableLandSize) : undefined,
      latitude: latitude ? Number(latitude) : undefined,
      longitude: longitude ? Number(longitude) : undefined,
      extractedInfo,
    };

    const listing = await prisma.listing.update({
      where: {
        id: numericListingId,
        userId: currentUser.id,
      },
      data: updateData,
    });

    return NextResponse.json(listing);
  } catch (error) {
    console.error("Failed to update listing:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "Unknown error" }, { status: 500 });
    }
  }
}
