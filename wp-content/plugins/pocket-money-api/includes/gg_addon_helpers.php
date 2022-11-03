<?php

function gg_spin_game_type($game_type_id=0) {
    
    $game_types= array(
        array(
            "title"=> "Competition + Skill",
            "tag"=> "comp",
            "p_u"=> true,
            "p_u_auto"=> false, // display stop button.
            "p_b"=> true
        ),
        array(
            "title"=> "Competition + Luck",
            "tag"=> "comp",
            "p_u"=> true,
            "p_u_auto"=> true, // no stop button.
            "p_b"=> true
        ),
        array(
            "title"=> "Collaboration + Skill",
            "tag"=> "collab",
            "p_u"=> true,
            "p_u_auto"=> false, // display stop button.
            "p_b"=> true        
        ),
        array(
            "title"=> "Collaboration + Luck",
            "tag"=> "collab",
            "p_u"=> true,
            "p_u_auto"=> true, // no stop button.
            "p_b"=> true       
        ),
        array(
            "title"=> "Individual + Skill",
            "tag"=> "indiv",
            "p_u"=> true,
            "p_u_auto"=> false, // display stop button.
            "p_b"=> false
        ), 
        array(
            "title"=> "Individual + Luck",
            "tag"=> "indiv",
            "p_u"=> true,
            "p_u_auto"=> true, // no stop button.
            "p_b"=> false
        )

    );
    
    // xyz.com
    // xyz.com?p=1
    // xyz.com?p=2
    // xyz.com?p=3
    // xyz.com?p=5

    return $game_types[$game_type_id];


}

function gg_spain_calculate_discount($user_res, $bot_res, $game_type_id) {


    if( $game_type_id == 4 || $game_type_id == 5) {

        return $user_res;

    } else if( $game_type_id == 2 || $game_type_id == 3) {


        if( $user_res < $bot_res ) {

            $discount_amount = $user_res + ($user_res - $bot_res) / 2;

        } else {
            $discount_amount = $user_res - ($user_res - $bot_res) / 2;
        }


        
        return $discount_amount;

    } else if( $game_type_id == 0 || $game_type_id == 1) {

        $discount_amount = $user_res + ($user_res - $bot_res) / 2;
        return $discount_amount;

    } else {
        return 0;
    }


}