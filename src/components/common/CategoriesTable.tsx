import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

const CategoriesTable = ({subcat, slug}: any) => {

     const navigate = useNavigate();

     const leaves = subcat.subcategories ?? [];

    return (



         <div
                key={subcat.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="flex-1 px-5 pt-5 pb-4">
                  <h3 className="text-sm font-bold text-gray-900 mb-3">{subcat.name}</h3>

                  {leaves.length > 0 && (
                    <ul className="space-y-1.5">
                      {leaves.slice(0, 4).map((leaf: any) => (
                        <li key={leaf.id}>
                          <button
                            onClick={() =>
                              navigate(`/products/${slug}/${subcat.slug}?category_id=${leaf.id}`)
                            }
                            className="text-xs text-gray-500 hover:text-black transition-colors text-left"
                          >
                            {leaf.name}
                          </button>
                        </li>
                      ))}
                      {leaves.length > 4 && (
                        <li className="text-xs text-gray-400">+{leaves.length - 4} more</li>
                      )}
                    </ul>
                  )}
                </div>

                <div className="px-5 pb-5">
                  <Button
                    variant="primary"
                    size="md"
                    fullWidth
                    className="rounded-xl"
                    onClick={() =>
                      navigate(`/products/${slug}/${subcat.slug}?category_id=${subcat.id}`)
                    }
                  >
                    View All
                  </Button>
                </div>
              </div>


    )



}




export default CategoriesTable;