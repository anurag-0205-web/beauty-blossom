import React, { useState, useEffect } from 'react';
import { Truck, Clock } from 'lucide-react';
import { calculateDeliveryDate, getTimeRemaining } from '../utils/delivery';
import { Product } from '../types';

interface DeliveryEstimatorProps {
  pincode: string;
  setPincode: (pincode: string) => void;
  product: Product;
}

const DeliveryEstimator: React.FC<DeliveryEstimatorProps> = ({
  pincode,
  setPincode,
  product
}) => {
  const [deliveryInfo, setDeliveryInfo] = useState<{
    date: string;
    logisticsProvider: string;
    message: string;
  } | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  useEffect(() => {
    const timer = setInterval(() => {
      if (deliveryInfo?.logisticsProvider === 'A') {
        const remaining = getTimeRemaining('A');
        setTimeRemaining(remaining);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [deliveryInfo]);

  const handlePincodeSubmit = () => {
    if (pincode.length === 6) {
      const info = calculateDeliveryDate(pincode, product.provider);
      setDeliveryInfo(info);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Delivery Information</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter Pincode
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
            placeholder="Enter delivery pincode"
            maxLength={6}
          />
          <button
            onClick={handlePincodeSubmit}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
          >
            Check
          </button>
        </div>
      </div>

      {deliveryInfo && (
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
            <Truck className="w-5 h-5 text-green-600 mt-1" />
            <div>
              <p className="font-medium text-green-800">
                {deliveryInfo.message}
              </p>
              <p className="text-green-700">
                Estimated Delivery: {deliveryInfo.date}
              </p>
              {deliveryInfo.logisticsProvider === 'A' && timeRemaining && (
                <div className="mt-2 flex items-center text-sm text-green-600">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>Order within {timeRemaining} for same-day delivery</span>
                </div>
              )}
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium mb-2">Delivery Information</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• Provider A: Same-day delivery (order before 5 PM)</p>
              <p>• Provider B: Next-day delivery</p>
              <p>• General Partners: 2-5 days delivery</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryEstimator;