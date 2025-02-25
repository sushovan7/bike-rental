function Title({ text1, text2, className }) {
  return (
    <div className="flex items-center gap-2">
      <p className={`${className}`}>
        {text1} <span className="text-gray-400">{text2}</span>
      </p>
    </div>
  );
}

export default Title;
