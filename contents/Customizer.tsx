"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";

import config from "@/config/config";
import state from "@/store";

import { download } from "@/assets";
import { downloadCanvasToImage, reader } from "@/config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "@/config/constants";

import { fadeAnimation, slideAnimation } from "@/config/motion";

import { AIPicker, ColorPicker, FilePicker, Tab, Button } from "@/components";
import { useState } from "react";

const Customizer = (): JSX.Element => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState<File | null>(null);

  const [prompt, setPrompt] = useState<string>("");
  const [generatingImage, setGeneratingImage] = useState<boolean>(false);

  const [activeEditorTab, setActiveEditorTab] = useState<string>("");
  const [activeFilterTab, setActiveFilterTab] = useState({ logoShirt: true, stylishShirt: false });

  // show tab content depending on the active tab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return <FilePicker />;
      case "aipicker":
        return <AIPicker />;
      default:
        return "null";
    }
  };

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          {/* left tabs */}

          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    isFilterTab
                    isActiveTab={true}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          {/* button back */}

          <motion.div className="absolute z-10 top-5 right-5" {...fadeAnimation}>
            <Button.Custom
              type="filled"
              title="Go Back"
              handleClick={() => (state.intro = true)}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            ></Button.Custom>
          </motion.div>

          {/* bottom tabs */}

          <motion.div className="filtertabs-container" {...slideAnimation("up")}>
            {FilterTabs.map((tab) => (
              <Tab key={tab.name} tab={tab} isFilterTab isActiveTab={true} handleClick={() => {}} />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
