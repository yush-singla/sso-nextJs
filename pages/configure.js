import { useEffect, useState } from "react";

export default function Configure() {
  const [microsoftTeams, setMicrosoftTeams] = useState();
  useEffect(() => {
    if (microsoftTeams) {
      microsoftTeams.initialize();
      microsoftTeams.settings.setValidityState(true);
      microsoftTeams.settings.registerOnSaveHandler((saveEvent) => {
        microsoftTeams.settings.setSettings({
          websiteUrl: "https://48c4ed03f874.ngrok.io ",
          contentUrl: "https://48c4ed03f874.ngrok.io ",
          entityId: "ssv",
          suggestedDisplayName: "ssv",
        });
        saveEvent.notifySuccess();
      });
    }
  }, [microsoftTeams]);
  useEffect(() => {
    const loadData = async () => {
      const data = await import("@microsoft/teams-js");
      setMicrosoftTeams(data);
    };
    loadData();
  }, []);
  return (
    <div>
      <div>This is where the configuration would show up.</div>
    </div>
  );
}
