"use client";

import type { NextPage } from "next";
import Head from "next/head";
import { Portal } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { AllUsers } from "@/components/tables/allUsers";

const Create: NextPage = () => {
  // const { t } = useTranslation(); //coklu dil destegi icin.
  return (
    <>
      <Head>
        <title>{"All Users"}</title>
      </Head>
      <Portal target="#page-title">{"AllUsers.AllUsers"}</Portal>
      <div className="work-area-table">
        <AllUsers />
        users
      </div>
    </>
  );
};

export default Create;
