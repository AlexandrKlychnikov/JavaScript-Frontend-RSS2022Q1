/* eslint-disable import/extensions */
import CartCounter, { CartProps } from './CartCounter';
import CartImage from './CartImage';

import './header.css';

function Cart({ amount }: CartProps) {
  return (
    <div className="header__cart">
      <CartImage />
      <CartCounter amount={amount} />
    </div>
  );
}

export default Cart;
