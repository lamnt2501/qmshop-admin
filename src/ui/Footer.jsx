function Footer() {
  return (
    <div className="flex justify-between bg-white p-4 text-slate-400">
      <p className="">
        <span className="uppercase">copyright &copy;</span> 2024 QMShop All
        rights Reserved
      </p>
      <p>
        Made by{" "}
        <a
          href="https://github.com/lamnt2501/qmshop-admin"
          target="_blank"
          className="text-main"
        >
          Lamdangfixbug
        </a>
      </p>
    </div>
  );
}

export default Footer;
