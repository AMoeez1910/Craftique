/**
 * v0 by Vercel.
 * @see https://v0.dev/t/VowZKqlMjvP
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "../components/ui/button"

const ViewOrder =() =>  {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>
      <div className="grid gap-6">
        <div className="border rounded-lg p-4 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <div className="text-lg font-medium">#1234</div>
                <div className="text-sm text-gray-500">June 15, 2023</div>
              </div>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-gray-500">Total</div>
                    <div className="font-medium">$99.99</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Status</div>
                    <div className="font-medium text-green-500">Delivered</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-gray-500">Payment Method</div>
                    <div className="font-medium">Visa *1234</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Shipping Method</div>
                    <div className="font-medium">Standard Shipping</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-gray-500">Shipping Address</div>
                    <div className="font-medium">123 Main St, Anytown USA 12345</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Billing Address</div>
                    <div className="font-medium">123 Main St, Anytown USA 12345</div>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="border rounded-lg p-4 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <div className="text-lg font-medium">#1235</div>
                <div className="text-sm text-gray-500">June 10, 2023</div>
              </div>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-gray-500">Total</div>
                    <div className="font-medium">$49.99</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Status</div>
                    <div className="font-medium text-yellow-500">Pending</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-gray-500">Payment Method</div>
                    <div className="font-medium">Mastercard *5678</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Shipping Method</div>
                    <div className="font-medium">Express Shipping</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-gray-500">Shipping Address</div>
                    <div className="font-medium">456 Oak St, Anytown USA 54321</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Billing Address</div>
                    <div className="font-medium">456 Oak St, Anytown USA 54321</div>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="border rounded-lg p-4 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <div className="text-lg font-medium">#1236</div>
                <div className="text-sm text-gray-500">June 5, 2023</div>
              </div>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-gray-500">Total</div>
                    <div className="font-medium">$79.99</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Status</div>
                    <div className="font-medium text-blue-500">Shipped</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-gray-500">Payment Method</div>
                    <div className="font-medium">American Express *9012</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Shipping Method</div>
                    <div className="font-medium">Priority Shipping</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-gray-500">Shipping Address</div>
                    <div className="font-medium">789 Pine Rd, Anytown USA 67890</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Billing Address</div>
                    <div className="font-medium">789 Pine Rd, Anytown USA 67890</div>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ViewOrder