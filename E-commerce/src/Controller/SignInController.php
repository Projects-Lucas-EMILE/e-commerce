<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\UserSession;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class SignInController extends AbstractController
{

    #[Route('/signin', name: 'sign_in', methods: ['POST'])]
public function signIn(Request $request, UserPasswordHasherInterface $passwordHasher, EntityManagerInterface $entityManager, ValidatorInterface $validator)
    {
    // Get the JSON data from the request body
    $jsonData = $request->getContent();

    // Check if the JSON data is empty or null
    if (empty($jsonData)) {
        return new JsonResponse(['error' => 'No data provided'], 400);
    }

    // Decode the JSON data
    $data = json_decode($jsonData, true);

// Validate the JSON data against constraints
    // $constraints = new Assert\Collection([
    //     'first_name' => new Assert\NotBlank(),
    //     'last_name' => new Assert\NotBlank(),
    //     'email' => new Assert\NotBlank(),
    //     'password' => new Assert\NotBlank(),
    // ]);

    // // Validate the data against the constraints
    // $violations = $validator->validate($data, $constraints);

    // if (count($violations) > 0) {
    //     $errorMessages = [];
    //     foreach ($violations as $violation) {
    //         $propertyPath = $violation->getPropertyPath();
    //         $errorMessage = $violation->getMessage();
    //         $errorMessages[$propertyPath] = $errorMessage;
    //     }

    //     return new JsonResponse(['error' => $errorMessages], 400);
    // }

// Check if the email is already used
    $existingUser = $entityManager->getRepository(User::class)->findOneBy(['email' => $data['email']]);
    if ($existingUser) {
        return new JsonResponse(['error' => 'Email is already used'], 409);
    }

    // Créer une nouvelle instance de l'entité User avec les données du formulaire
    $user = new User();
    $user->setFirstName($data['first_name']);
    $user->setLastName($data['last_name']);
    $user->setEmail($data['email']);
    $user->setBirthdate(new \DateTime($data['birthdate']));
    $user->setPhone($data['phone']);
    $user->setCountry($data['country']);

    // Hachage du mot de passe
    $hashedPassword = $passwordHasher->hashPassword($user, $data['password']);
    $user->setPassword($hashedPassword);

    // Enregistrer l'utilisateur dans la base de données
    $entityManager->persist($user);
    $entityManager->flush();

    // Return a success response
    return new JsonResponse(['message' => 'Inscription réussie'], 200);
}

#[Route('/log', name: 'log', methods: ['POST'])]
function LogIn(Request $request, UserPasswordHasherInterface $passwordHasher, EntityManagerInterface $entityManager)
    {
    // Get the JSON data from the request body
    $jsonData = $request->getContent();

    // Check if the JSON data is empty or null
    if (empty($jsonData)) {
        return new JsonResponse(['error' => 'No data provided'], 400);
    }

    // Decode the JSON data
    $data = json_decode($jsonData, true);

    $existingUser = $entityManager->getRepository(User::class)->findOneBy(['email' => $data['email']]);
    if (!$existingUser) {
        return new JsonResponse(['error' => 'No account linked to this email'], 409);
    }

    // Vérifier la validité du mot de passe
    if (!$passwordHasher->isPasswordValid($existingUser, $data['password'])) {
        return new JsonResponse(['error' => 'Invalid credentials'], 401);
    }

    // Start the session
    $session = $request->getSession();
    $session->start();

    // Generate a session token
    $sessionToken = $session->getId();

    // Create or update the UserSession entity
    $userSession = $entityManager->getRepository(UserSession::class)->findOneBy(['user' => $existingUser]);

    if (!$userSession) {
        $userSession = new UserSession();
        $userSession->setUser($existingUser);
    }

    // Update the session token
    $userSession->setSessionToken($sessionToken);

    // Persist the UserSession
    $entityManager->persist($userSession);
    $entityManager->flush();

    $userData = [
        'session_id' => $sessionToken,
        'first_name' => $existingUser->getFirstName(),
        'last_name' => $existingUser->getLastName(),
        'email' => $existingUser->getEmail(),
        'birthdate' => $existingUser->getBirthdate(),
        'phone' => $existingUser->getPhone(),
        'country' => $existingUser->getCountry(),
        'city' => $existingUser->getCity(),
    ];

    return new JsonResponse([
        'message' => 'Connexion réussie',
        'session_id' => $sessionToken,
        'user_data' => $userData, // Include the user data in the response
    ], 200);
}

}
