export const getAdminWallets = () => {
  if (!process.env.ADMINS_PBKS) {
    return [];
  }

  return process.env.ADMINS_PBKS.split(",");
};
