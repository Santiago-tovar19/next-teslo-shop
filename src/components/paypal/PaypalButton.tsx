"use client";
import React from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
  CreateOrderData,
  CreateOrderActions,
  OnApproveActions,
  OnApproveData,
} from "@paypal/paypal-js";
import { setTransactionId } from "@/actions/payments/set-transaction-id";
import { paypalCheckPayment } from "@/actions/payments/paypal-check-payments";

interface Props {
  orderId: string;
  amount: number;
}

export const PaypalButton = ({ orderId, amount }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();

  const roundedAmount = Math.round(amount * 100) / 100;

  console.log(roundedAmount);

  if (isPending)
    return (
      <div className="animate-plus mb-11">
        <div className="h-11 bg-gray-300 rounded"></div>
        <div className="h-11 bg-gray-300 rounded mt-3"></div>
      </div>
    );

  const createOrder = async (data: CreateOrderData, actions: CreateOrderActions) => {
    const transactionId = await actions.order.create({
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            value: `${roundedAmount}`,
          },
        },
      ],
    });

    console.log("Transaction ID: ", { transactionId });

    //guardar el id en la orden en la base de datos
    const { ok } = await setTransactionId(orderId, transactionId);

    if (!ok) {
      throw new Error("No se pudo actualizar la orden");
    }

    return transactionId;
  };

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    console.log("Approving payment");
    const details = await actions.order?.capture();

    if (!details) return;

    await paypalCheckPayment(details.id);
  };
  return (
    <div className="relative z-0">
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </div>
  );
};
