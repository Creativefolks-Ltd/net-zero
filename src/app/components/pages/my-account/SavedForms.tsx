import React from "react";
import SavedFormDrawer from "./SavedFormDrawer";

export default function SavedForms() {
  return (
    <div className="md:w-1/2">
      <h2 className="text-4xl text-brand-dark font-light mb-5">Saved forms</h2>
      <div className="flex flex-col gap-2">
        <SavedFormDrawer submitted />
        <SavedFormDrawer />
        <SavedFormDrawer submitted />
        <SavedFormDrawer />
        <SavedFormDrawer submitted />
        <SavedFormDrawer />
      </div>
    </div>
  );
}
