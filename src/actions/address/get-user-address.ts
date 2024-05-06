import { Address } from "@/interfaces/address.interface";
import prisma from "@/lib/prisma";

interface AddressPro {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  address2: string | null;
  postalCode: string;
  phone: string;
  countryId: string;
  userId: string;
}

export const getUserAddress = async (userId: string): Promise<Address | null> => {
  try {
    const address = await prisma.userAddress.findUnique({ where: { userId } });

    if (!address) return null;

    const { countryId, address2, ...rest } = address;

    return {
      ...rest,
      country: countryId,
      address2: address2 ? address2 : "",
    };
  } catch (error) {
    console.log(error);

    return null;
  }
};
