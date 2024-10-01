"use client"

import Link from "next/link";
import type { FC } from "react";

import { classNames, kebabToProperName } from "@/utils/string";
import type { TabName } from "../type";
import Title from "@/components/title";

const tabs: TabName[] = ['decks', 'add', 'edit']

interface TabsProps {
  selectedTab: TabName;
}

const Tabs: FC<TabsProps> = ({ selectedTab }) => (
  <>
    <Title>Flash Card</Title>
    <div className="flex gap-4 lg:gap-6 mt-4 lg:mt-6">
      {tabs.map(tab =>
        <Link
          key={tab}
          className={classNames("btn", { "btn-primary": tab === selectedTab })}
          href={`/utility/flash-card/${tab}`}
          type="button"
        >
          {kebabToProperName(tab)}
        </Link>)}
    </div>
    <hr />
  </>)


export default Tabs