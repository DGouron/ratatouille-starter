"use client";

import { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering.domain-model";
import { GuestsSection } from "@ratatouille/modules/order/react/sections/guest/GuestsSection";
import { MealsSection } from "@ratatouille/modules/order/react/sections/meals/MealsSection";
import { ReservedSection } from "@ratatouille/modules/order/react/sections/reserved/ReservedSection";
import { SummarySection } from "@ratatouille/modules/order/react/sections/summary/SummarySection";
import { TableSection } from "@ratatouille/modules/order/react/sections/table/TableSection";
import type { AppState } from "@ratatouille/modules/store/store";
import React from "react";
import { useSelector } from "react-redux";

export const OrderPage: React.FC = () => {
  const step = useSelector((state: AppState) => state.ordering.step);
  return <main>
    {step === OrderingDomainModel.Step.GUEST && <GuestsSection />}
    {step === OrderingDomainModel.Step.MEALS && <MealsSection />}
    {step === OrderingDomainModel.Step.RESERVED && <ReservedSection />}
    {step === OrderingDomainModel.Step.SUMMARY && <SummarySection />}
    {step === OrderingDomainModel.Step.TABLE && <TableSection />}
  </main>;
};
