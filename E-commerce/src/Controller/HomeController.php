<?php
// src/Controller/HomeController.php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Form\LoginFormType;
use App\Entity\AdminUser;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Form\FormError;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;

class HomeController extends AbstractController
{
    private $entityManager;
    private $tokenStorage;

    public function __construct(EntityManagerInterface $entityManager, TokenStorageInterface $tokenStorage)
    {
        $this->entityManager = $entityManager;
        $this->tokenStorage = $tokenStorage;
    }

    /**
     * @Route("/", name="home", methods={"GET", "POST"})
     */
    public function index(Request $request, SessionInterface $session, Security $security): Response
    {
        // Create the login form
        $form = $this->createForm(LoginFormType::class);

        // Handle the form submission
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            // Get the submitted data from the form
            $formData = $form->getData();

            // Find the user by the submitted username (assuming username is unique)
            $userRepository = $this->entityManager->getRepository(AdminUser::class);
            $user = $userRepository->findOneBy(['username' => $formData['username']]);

            // Check if a user with the given username exists
            if (!$user) {
                // Add a form error for the username field
                $form->get('username')->addError(new FormError('Invalid credentials'));
                return $this->render('home/index.html.twig', [
                    'form' => $form->createView(),
                ]);
            }

            // Verify the password (plain text, for simplicity)
            if ($user->getPassword() !== $formData['password']) {
                // Add a form error for the password field
                $form->get('password')->addError(new FormError('Invalid credentials'));
                return $this->render('home/index.html.twig', [
                    'form' => $form->createView(),
                ]);
            }

            // If the login is successful, you can perform additional actions here, like setting up authentication tokens, etc.
            // For example, storing a token in the token storage:
            $firewallName = 'main'; // Replace 'your_firewall_name' with the actual name of your firewall
            $token = new UsernamePasswordToken($user, $firewallName, $user->getRoles());

            // Set the token in the token storage
            $this->tokenStorage->setToken($token);

            // Store the token in the session
            $session->set('_security_' . $firewallName, serialize($token));

            // Redirect to another page after successful login
            return $this->redirectToRoute('app_product_index'); // Replace 'product' with your target route
        }


        return $this->render('home/index.html.twig', [
            'form' => $form->createView(),
        ]);
    }
}
