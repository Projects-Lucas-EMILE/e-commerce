<?php

namespace App\Service;

use GuzzleHttp\Client;

class UpsApiService
{
    private $apiKey;

    public function __construct($apiKey)
    {
        $this->apiKey = $apiKey;
    }

    public function calculateShippingCosts($address, $weight, $dimensions)
    {
        $client = new Client();

        $response = $client->get('https://some.ups.api.endpoint', [
            'query' => [
                'address' => $address,
                'weight' => $weight,
                'dimensions' => $dimensions,
                'apiKey' => $this->apiKey,
            ]
        ]);

        $data = json_decode($response->getBody(), true);

        return $data;
    }
}
