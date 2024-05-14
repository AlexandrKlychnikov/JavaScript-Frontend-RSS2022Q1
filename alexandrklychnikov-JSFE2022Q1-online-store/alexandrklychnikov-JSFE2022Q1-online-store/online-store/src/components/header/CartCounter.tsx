import './header.css';

export type CartProps = {
  amount: string;
};

function CartCounter({ amount }: CartProps) {
  return <p className="cart-counter">{amount}</p>;
}

export default CartCounter;
