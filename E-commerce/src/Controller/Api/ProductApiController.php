<?php
// ProductApiController.php
namespace App\Controller\Api;

use App\Entity\Product;
use App\Entity\Category;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\SerializerInterface;
use Doctrine\ORM\Query\Expr\Join; // Import the Join class for leftJoin

class ProductApiController extends AbstractController
{
    #[Route('/product/api', name: 'app_product_api', methods: ['GET'])]
    public function getAllProducts(Request $request, EntityManagerInterface $entityManager, SerializerInterface $serializer)
    {
        // Get the query parameters from the request
        $itemsPerPage = $request->query->getInt('item', 24);
        $currentPage = $request->query->getInt('page', 1);
        $discount = $request->query->getBoolean('discount', false);
        $categoryId = $request->query->getInt('category_id', 0);
        $subCategoryId = $request->query->getInt('sub_category_id', 0);
        $name = $request->query->get('name', '');
        $order = $request->query->get('order', 'views desc');
        $orderParts = explode(' ', $order);
        $orderByColumn = $orderParts[0];
        $orderByDirection = isset($orderParts[1]) && strtoupper($orderParts[1]) === 'DESC' ? 'DESC' : 'ASC';

        // Calculate the offset to paginate the results
        $offset = max(0, ($currentPage - 1) * $itemsPerPage);

        // Prepare the filter array based on the category ID
        $filter = [];
        if ($categoryId > 0) {
            $category = $entityManager->getRepository(Category::class)->find($categoryId);
            if ($category) {
                $filter['category'] = $category;
            }
        }
        if ($subCategoryId > 0) {
            $subCategory = $entityManager->getRepository(Category::class)->find($subCategoryId);
            if ($subCategory) {
                $filter['subCategory'] = $subCategory;
            }
        }


        // Get the products based on the pagination settings and the filter
        $queryBuilder = $entityManager->getRepository(Product::class)->createQueryBuilder('p');

        // Use the leftJoin method to fetch the related images
        $queryBuilder->leftJoin('p.images', 'i', Join::WITH);

        if ($discount === true) {
            $queryBuilder->andWhere("p.discount <> 0");
        }

        if (!empty($name)) {
            $queryBuilder->andWhere("p.name LIKE :name");
            $queryBuilder->setParameter('name', '%' . $name . '%');
        }

        // Add the filter conditions
        foreach ($filter as $key => $value) {
            $queryBuilder->andWhere("p.{$key} = :{$key}");
            $queryBuilder->setParameter($key, $value);
        }

        if (!empty($orderByColumn)) {
            if ($orderByColumn === 'price') {
                $orderExpression = "CASE WHEN ({$queryBuilder->getRootAliases()[0]}.discount = 0) THEN {$queryBuilder->getRootAliases()[0]}.price ELSE ({$queryBuilder->getRootAliases()[0]}.price * {$queryBuilder->getRootAliases()[0]}.discount) / 100 END";
                $queryBuilder->orderBy($orderExpression, $orderByDirection);
            } else {
                $queryBuilder->orderBy("p.{$orderByColumn}", $orderByDirection);
            }
        }

        // Set the pagination parameters
        $queryBuilder->setMaxResults($itemsPerPage);
        $queryBuilder->setFirstResult($offset);

        // Execute the query and get the products
        $products = $queryBuilder->getQuery()->getResult();

        // Serialize the products array to JSON using Serialization Groups
        $jsonProducts = $serializer->serialize($products, 'json', ['groups' => ['product_list', 'image_list']]);

        // Create the JsonResponse with the serialized JSON
        return new JsonResponse($jsonProducts, 200, [], true);
    }

    #[Route('/product/api/{id}', name: 'app_product_detail', methods: ['GET'])]
    public function getProductDetail(int $id, EntityManagerInterface $entityManager, SerializerInterface $serializer)
    {
        // Get the product based on the given ID
        $product = $entityManager->getRepository(Product::class)->find($id);

        // Check if the product exists
        if (!$product) {
            // Return a JSON response indicating that the product was not found
            return new JsonResponse(['error' => 'Product not found'], 404);
        }

        // Update the views count in the database
        $entityManager->persist($product);
        $entityManager->flush();

        // Serialize the product object to JSON using Serialization Groups
        $jsonProduct = $serializer->serialize($product, 'json', ['groups' => ['product_detail', 'image_list']]);

        // Create the JsonResponse with the serialized JSON
        return new JsonResponse($jsonProduct, 200, [], true);
    }

    #[Route('/product/api/{id}/increment-views', name: 'app_product_increment_views', methods: ['PUT'])]
    public function incrementViews(int $id, EntityManagerInterface $entityManager)
    {
        $product = $entityManager->getRepository(Product::class)->find($id);

        if (!$product) {
            return new JsonResponse(['error' => 'Product not found'], 404);
        }

        // Increment the views count for the product
        $product->setViews($product->getViews() + 1);

        // Update the views count in the database
        $entityManager->persist($product);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Views incremented successfully'], 200);
    }
}
