<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * UserPaymentInformation
 *
 * @ORM\Table(name="user_payment_information", indexes={@ORM\Index(name="user_id", columns={"user_id"})})
 * @ORM\Entity
 */
class UserPaymentInformation
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var int
     *
     * @ORM\Column(name="card_number", type="integer", nullable=false)
     */
    private $cardNumber;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="expiration_date", type="date", nullable=false)
     */
    private $expirationDate;

    /**
     * @var int
     *
     * @ORM\Column(name="security_code", type="integer", nullable=false)
     */
    private $securityCode;

    /**
     * @var string
     *
     * @ORM\Column(name="billing_address", type="string", length=255, nullable=false)
     */
    private $billingAddress;

    /**
     * @var \User
     *
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     * })
     */
    private $user;


}
