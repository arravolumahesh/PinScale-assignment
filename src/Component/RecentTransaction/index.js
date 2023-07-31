import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faCircleArrowDown } from "@fortawesome/free-solid-svg-icons";
import ModalForUpdate from "../ModalForUpdate/index";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import "./index.css";

const RecentTransaction = (props) => {
  const { each, dataFromModal } = props;
  const { amount, type, date, category, transaction_name } = each;

  const formatDate = format(new Date(date), "dd MMM, hh.mm a");

  return (
    <>
      <li className="transaction-list">
        {type === "debit" ? (
          <FontAwesomeIcon
            icon={faCircleArrowDown}
            className="icon-image debit-icon-color"
          />
        ) : (
          <FontAwesomeIcon
            icon={faCircleArrowUp}
            className="icon-image credit-icon-color"
          />
        )}

        <p className="transaction-name name-cont">{transaction_name}</p>
        <p className="transaction-name">{category}</p>
        <p className="transaction-name">{formatDate}</p>
        {type === "debit" ? (
          <p className="debit-icon-color weight"> -${amount}</p>
        ) : (
          <p className="credit-icon-color weight">+${amount}</p>
        )}
        <ModalForUpdate each={each} dataFromModal={dataFromModal} />
        <button className="icon-btn">
          <FontAwesomeIcon icon={faTrashCan} className="debit-icon-color" />
        </button>
      </li>
      <hr className="horizontal-line" />
    </>
  );
};

export default RecentTransaction;
