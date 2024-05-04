import { useCustomDataProvider } from "../../hooks/useDataProvider";
import { useState } from "react";
import {
  Button,
  useNotify,
  useTranslate,
  useShowController,
} from "react-admin";
import { Box, Card, CardContent, Typography } from "@mui/material";

interface Drop {
  game: string;
  name: string;
  end: string;
  start: string;
  drops: [{ 
    name: string, 
    watched: number, 
    required: number
  }]
}

export default function BotDropsBox() {
  const { record } = useShowController();
  const dataProvider = useCustomDataProvider();
  const translate = useTranslate();
  const notify = useNotify();
  const [data, setData] = useState<Drop[]>([]);
  const [btnClicked, setBtnClicked] = useState(false);

  const getDrops = async () => {
    try {
      const res = await dataProvider.getDrops("get-bot-drops", record.token);
      notify(translate(`server.res.${res.status}`));
      if (res.status !== 200) return;
      const resData = res.data as Drop[];
      setData(resData);
      setBtnClicked(true);
    } catch (e) {
      console.error(e);
      notify(translate("server.res.400"));
    }
  };

  return (
    <>
      <Button
        label="custom.action.showProgress"
        variant="contained"
        onClick={getDrops}
        sx={{ m: 2 }}
      />
      <Box display="flex" flexWrap="wrap" gap={3}>
        {btnClicked &&
          (data.length ? (
            data.map((campaign, index) => (
              <Card key={index} sx={{ maxWidth: 450, mb: 1 }}>
                <CardContent>
                  <Typography variant="h5">{campaign.game}</Typography>
                  <Typography variant="h6">{campaign.name}</Typography>
                  <Typography variant="subtitle2">
                    Start: {campaign.start} | End: {campaign.end}
                  </Typography>
                  {campaign.drops.map((drop, dropIndex) => (
                    <Box
                      key={dropIndex}
                      display="flex"
                      justifyContent="space-between"
                    >
                      <Typography variant="body1">Drop: {drop.name}</Typography>
                      <Typography variant="body2">
                        {drop.watched} of {drop.required}
                      </Typography>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            ))
          ) : (
            <Card sx={{ maxWidth: 450, mb: 1 }}>
              <CardContent>
                <Typography variant="h4">
                  {translate("custom.labels.noDrops")}
                </Typography>
              </CardContent>
            </Card>
          ))}
      </Box>
    </>
  );
}
