import { Box, Typography } from '@mui/material';
import { AnimatePresence, motion } from "framer-motion";
import { admin_dataDrawerNavAdmin } from '@/app/utils/constants/data/components/layouts/admin/admin_dataDrawerNavAdmin';
import Link from 'next/link';
import SidebarMenu from "./sidebarMenu/SidebarMenu"

export default function DrawerAdmin({ isOpen, setIsOpen }) {
      const toggle = () => setIsOpen(!isOpen);

      const showAnimation = {
        hidden: {
          width: 0,
          opacity: 0,
          transition: {
            duration: 0.5,
          },
        },
        show: {
          opacity: 1,
          width: "auto",
          transition: {
            duration: 0.5,
          },
        },
      };

  return (
    <Box
      className='main-container'
      onMouseLeave={() => setIsOpen(false)}
      onMouseOver={() => setIsOpen(true)}
    >
      <motion.div
        animate={{
          // background: isOpen ? <RootDrawerNavAdmin /> : "rgb(0, 7, 61)",
          // width: isOpen ? "200px" : "45px",
          width: isOpen ? "30vw" : "2vw",
          transition: {
            duration: 0.5,
            type: "spring",
            damping: 10,
          },
        }}
        // style={`{ ${isOpen ? <RootDrawerNavAdmin /> : <NavAdmin />}}`}
        className={isOpen ? "testBg" : "sidebar"}
      >
          <Box
            style={{
              background: isOpen ? "rgba(0, 0, 0, 0.4)" : "",
              margin: isOpen ? "50px" : "",
              padding: isOpen ? "50px" : "",
              borderRadius: isOpen ? "25px" : "",
            }}
          >
            <Box className='routes'>
              {admin_dataDrawerNavAdmin.map((route, index) => {
                if (route.subRoutes) {
                  return (
                    <SidebarMenu
                      setIsOpen={setIsOpen}
                      toggle={toggle}
                      route={route}
                      showAnimation={showAnimation}
                      isOpen={isOpen}
                    />
                  );
                }

                return (
                  <Link
                    href={route.path}
                    key={index}
                    className='link'
                    activeClassName='active'
                  >
                    <div className='icon'>{route.icon}</div>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          variants={showAnimation}
                          initial='hidden'
                          animate='show'
                          exit='hidden'
                          className='link_text'
                        >
                          <Typography variant='h5'>{route.name}</Typography>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Link>
                );
              })}
            </Box>
          </Box>
      </motion.div>
    </Box>
  );
}
