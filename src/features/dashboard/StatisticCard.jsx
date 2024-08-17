function StatisticCard({
  icon,
  themeColors: {
    iconBackgroundColor,
    backgroundColor,
    lightEffectColor,
    darkEffectColor,
  },
  title,
  data,
  status = "equal",
}) {
  return (
    <div
      className="relative overflow-hidden rounded-md p-3"
      style={{ backgroundColor }}
    >
      <div
        className="flex h-8 w-8 items-center justify-center rounded-[50%] border border-dashed"
        style={{ borderColor: iconBackgroundColor }}
      >
        <span
          className={`flex h-6 w-6 items-center justify-center rounded-[50%] text-[14px] text-white`}
          style={{ backgroundColor: iconBackgroundColor }}
        >
          {icon}
        </span>
      </div>
      <p className="mt-3 text-sm">{title}</p>
      <p className="flex items-center gap-2">
        <span className="text-lg font-semibold">{data}</span>
        <span style={{ color: iconBackgroundColor }}>
          {status === "up" && <i className="fa-solid fa-arrow-trend-up"></i>}
          {status === "down" && (
            <i className="fa-solid fa-arrow-trend-down"></i>
          )}
          {status === "equal" && <i className="fa-solid fa-minus"></i>}
        </span>
      </p>
      <div
        className="absolute right-0 top-0 h-[160px] w-[160px] translate-x-[50%] translate-y-[-50%] rounded-[50%] border-[16px]"
        style={{
          backgroundColor: darkEffectColor,
          borderColor: lightEffectColor,
        }}
      ></div>
    </div>
  );
}

export default StatisticCard;
