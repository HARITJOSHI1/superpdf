import { Grid, Stack, Typography, Box } from '@mui/material';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GMQ } from '../../reducers';
import F1 from '../assets/f1.png';
import F2 from '../assets/f2.png';
import F3 from '../assets/f2-e.png';
import { OpKeys } from '../../PDFOps/Operations';
import { Context } from '../../Layout';
import EntryForm from '../../Entry/EntryForm';
import SignUp from '../../Entry/SignUp';

interface Props {
  breakpoint: GMQ;
}

type Feature = {
  img: string;
  feature: string;
  description: string;
  link: string;
  path?: OpKeys;
};

const featArr: Feature[] = [
  {
    img: F1,
    feature: 'Work Directly on Your Files',
    description: `
    Do more than just view PDFs. Highlight and add text, images,
    shapes, and freehand annotations to your documents. You can
    make use of 20 other tools to enhance your files further.`,
    link: 'Visit edit PDF',
    path: 'edit-pdf',
  },

  {
    img: F3,
    feature: 'Digital Signatures Made Easy',
    description: `
    Fill in forms, e-sign contracts, and close deals in a few simple steps. You can also request e-signatures and track your document every step of the way.
    `,
    link: 'Visit eSign',
    path: 'esign-pdf',
  },

  {
    img: F2,
    feature: 'Manage Documents—All in One Place',
    description: `
    No more working across multiple apps! Save time by storing, managing, and sharing files across devices—straight from our web platform.`,
    link: 'Sign up now',
  },
];

export default function Features(props: Props) {
  const { mobile, tabPort, tabLand, desktop } = props.breakpoint;
  const { setModal } = useContext(Context)[1];

  return (
    <>
      {featArr.map((f: Feature, idx: number) => {
        return (
          <Grid key={idx} item xs={12} sm={12} md={12} lg={12}>
            <Grid
              container
              spacing={7}
              direction={(():
                | 'column'
                | 'column-reverse'
                | 'row'
                | 'row-reverse' => {
                if (mobile || tabPort) return 'column-reverse';
                if (tabLand || desktop) {
                  if ((idx + 1) % 2 === 0) {
                    return 'row-reverse';
                  } else return 'row';
                } else return 'row';
              })()}
            >
              <Grid
                item
                xs={12}
                sm={8}
                md={6}
                lg={6}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Stack
                  direction="column"
                  spacing={3}
                  justifyContent="center"
                  sx={[
                    desktop && { width: '90%' },
                    mobile && { textAlign: 'center', alignItems: 'center' },
                  ]}
                >
                  <Typography variant="h4">{f.feature}</Typography>

                  <Typography sx={{ color: 'secondary.dark' }}>
                    {f.description}
                  </Typography>

                  <Link
                    to={f.path ? `/operation/${f.path}` : `/`}
                    onClick={() =>
                      !f.path
                        ? setModal({
                            show: true,
                            fn: () => {
                              return (
                                <SignUp>
                                  <EntryForm
                                    breakpoint={props.breakpoint}
                                    num={3}
                                  />
                                </SignUp>
                              );
                            },
                          })
                        : null
                    }
                    style={{
                      display: 'inline-block',
                      width: 'max-content',
                      color: '#0044ff',
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        transition: '.2s',
                        '&:hover': {
                          letterSpacing: '.5px',
                        },
                      }}
                    >
                      {f.link}
                    </Box>
                  </Link>
                </Stack>
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                md={6}
                lg={6}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <img
                  src={f.img}
                  alt=""
                  style={{
                    width: '100%',
                    pointerEvents: 'none',
                    userSelect: 'none',
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        );
      })}
    </>
  );
}
