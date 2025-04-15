"use client";

import { signOut, useSession } from "next-auth/react";

export default function LogoutButton() {
  const { data: session } = useSession();

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      {session?.user?.email && (
        <span style={{ color: "white" }}>({session.user.email})</span>
      )}
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        style={{
          padding: "8px 16px",
          backgroundColor: "#d9534f",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Se déconnecter
      </button>
    </div>
  );
}
