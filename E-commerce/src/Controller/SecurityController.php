<?php
// src/Controller/SecurityController.php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use App\Form\LoginFormType;
use App\Entity\AdminUser;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Http\Logout\LogoutSuccessHandlerInterface;

class SecurityController extends AbstractController
{
    /**
     * @Route("/login", name="app_login")
     */
    public function login(Request $request, AuthenticationUtils $authenticationUtils, EntityManagerInterface $entityManager)
    {
        // Check if the user is already authenticated (logged in)
        if ($this->isGranted('IS_AUTHENTICATED_FULLY')) {
            return $this->redirectToRoute('home'); // Redirect to the home page or any other page you want
        }

        // Create a new instance of the login form
        $form = $this->createForm(LoginFormType::class);

        // Handle the form submission
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            // Get the form data
            $formData = $form->getData();

            // Retrieve the user from the database based on the entered username
            $userRepository = $entityManager->getRepository(AdminUser::class);
            $user = $userRepository->findOneBy(['username' => $formData['username']]);

            if (!$user) {
                // User not found, show an error message
                $this->addFlash('error', 'Invalid username or password.');
            } else {
                // Check if the entered password matches the user's hashed password
                $passwordEncoder = $this->get('security.password_encoder');
                if ($passwordEncoder->isPasswordValid($user, $formData['password'])) {
                    // Password is valid, log the user in
                    $token = new UsernamePasswordToken($user, null, 'main', $user->getRoles());
                    $this->get('security.token_storage')->setToken($token);

                    $this->addFlash('success', 'You are now logged in.');
                    return $this->redirectToRoute('home'); // Redirect to the home page or any other page after successful login
                } else {
                    // Invalid password, show an error message
                    $this->addFlash('error', 'Invalid username or password.');
                }
            }
        }

        // Get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();

        // Get the last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();

        return $this->render('index.html.twig', [
            'last_username' => $lastUsername,
            'error' => $error,
            'form' => $form->createView(), // Pass the form view to the template
        ]);
    }
    /**
     * @Route("/logout", name="app_logout")
     */
    public function logout(LogoutSuccessHandlerInterface $logoutSuccessHandler): Response
    {
        // This method will never be executed.
        // The logout process is handled by Symfony's security system.
        // The LogoutSuccessHandler will take care of redirecting the user after logout.
        return $logoutSuccessHandler->onLogoutSuccess($this->getRequest());
    }
}
