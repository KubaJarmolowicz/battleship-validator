import { Props } from "types";

const BattlefieldWrapper = ({ children }: Props): JSX.Element => {
  return (
    <div className="border-r-2 border-white border-opacity-30 p-12">
      {children}
    </div>
  );
};

export default BattlefieldWrapper;
