import { error } from "console";
import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import { Button } from "~/component/Button";
import { FormGroup } from "~/component/FormGroup";
import { Input } from "~/component/Input";
import { api } from "~/utils/api";

const GeneratePage: NextPage = () => {
  const [form, setForm] = useState({
    prompt: "",
  });

  const generateIcon = api.generate.generateIcon.useMutation({
    onSuccess(data) {
      console.log("mutation finished", data);
    },
  });

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    generateIcon.mutate({
      prompt: form.prompt,
    });
  }

  function updateForm(key: string) {
    return function (e: React.ChangeEvent<HTMLInputElement>) {
      setForm((prev) => ({
        ...prev,
        [key]: e.target.value,
      }));
    };
  }

  const session = useSession();
  const isLogedIn = !!session.data;

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        {!isLogedIn && (
          <Button
            onClick={() => {
              signIn().catch(console.error);
            }}
          >
            Log In
          </Button>
        )}
        {isLogedIn && (
          <Button
            onClick={() => {
              signOut().catch(console.error);
            }}
          >
            Log Out
          </Button>
        )}
        <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
          <FormGroup>
            <label>Prompt</label>
            <Input value={form.prompt} onChange={updateForm("prompt")}></Input>
          </FormGroup>
          <Button>Submit</Button>
        </form>
      </main>
    </>
  );
};

export default GeneratePage;
