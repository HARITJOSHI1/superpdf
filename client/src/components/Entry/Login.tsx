import React, { ReactNode, useEffect, useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { alpha, Box, darken, Icon, Stack, TextField } from "@mui/material";
import { GMQ } from "../reducers";
import { motion } from "framer-motion";
import Error from "../Error";
import { Context } from "../Layout";
import OAuth from "../Auth";
import { fontWeight } from "@mui/system";

interface Props {
  breakpoint: GMQ;
  children?: ReactNode;
  img?: string;
}

export default function Entry(props: Props) {
  const { isErr, setErr } = useContext(Context)[2];
  const { setLogin} = useContext(Context)[3];

  useEffect(() => {
    let id: NodeJS.Timeout;
    if (isErr.message) {
      id = setTimeout(() => {
        setErr((state) => {
          return (state = { message: "" });
        });
      }, 3000);
    }

    return () => {
      clearTimeout(id);
    };
  }, [isErr.message]);

  const { mobile, tabPort, tabLand, desktop } = props.breakpoint;
  return (
    <Card
      key="card"
      component={motion.div}
      initial={{ scale: 0.4 }}
      transition={{
        ease: "easeIn",
        duration: 0.2,
      }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      sx={[
        {
          bgcolor: "white",
          //   height: "100%",
          width: mobile ? "90%" : "45%",
          opacity: "1",
          position: "relative",
          zIndex: "100000",
          borderRadius: "12px",
        },

        tabPort && {
          width: "60%",
          height: "auto",
        },
      ]}
    >
      <Stack
        direction="column"
        alignItems="center"
        sx={[{ height: "100%", maxHeight: "100%" }]}
      >
        <CardContent
          sx={[
            {
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "start",
              p: "2.5rem",
              pb: "2.5rem !important",
              width: "100%",

              "& > :not(:last-child)": {
                marginBottom: "1.5rem",
              },
            },
            (tabPort || mobile) && { height: "100%", px: "2" },
          ]}
        >
          <Typography
            variant="h4"
            component="div"
            sx={[
              { fontSize: "1.8rem" },
              tabPort && { fontSize: "1.5rem" },
              mobile && { fontSize: "1.5rem" },
            ]}
          >
            Login
          </Typography>

          <OAuth breakpoint={props.breakpoint} />
          {isErr.message && (
            <Error breakpoint={props.breakpoint} err={`${isErr.message}`} />
          )}
          {props.children}

          <Stack
            direction="row"
            justifyContent="space-between"
            sx={[{ width: mobile ? "100%" : "65%" }, tabLand && {width: "75%"}, tabPort && {width: "75%"}]}
          >
            <Typography
              component="span"
              sx={{ color: "#5340FF", fontWeight: "500", fontSize: ".9rem", cursor: "pointer" }}
            >
              Forgot password?
            </Typography>
            <Typography
              component="span"
              onClick= {() => setLogin(false)}
              sx={{ color: "#5340FF", fontWeight: "500", fontSize: ".9rem", cursor: "pointer" }}
            >
              Create an account
            </Typography>
          </Stack>
        </CardContent>
      </Stack>
    </Card>
  );
}
