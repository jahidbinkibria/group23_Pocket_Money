<form method="post" action="" enctype="multipart/form-data" id="gg_spin_form">

  <?php wp_nonce_field( 'gg-spin-data-export', '_wpnonce-gg-spin-data-export' ); ?>



  <div class="gg_spin_option" id="gg_data_tags">
    <p class="gg_option_title">Filter Result: </p>
    <div class="form-inline">

      <label for="filter_game_type_id">Game Type:</label>

      <select name="filter_game_type_id" id="filter_game_type_id">
        <option value="">-Select-</option>
        <option value="0">Competition + Skill</option>
        <option value="1">Competition + Luck</option>
        <option value="2">Collaboration + Skill</option>
        <option value="3">Collaboration + Luck</option>
        <option value="4">Individual + Skill</option>
        <option value="5">Individual + Luck</option>
      </select>

      &nbsp;
      <label for="filter_result_type">Result Type:</label>

      <select name="filter_result_type" id="filter_result_type">
        <option value="">-Select-</option>
        <option value="1">User Win</option>
        <option value="0">Bot Win</option>
        <option value="2">Tie</option>
        <option value="3">Not Played</option>
      </select>

      <!-- <label for="email">Email:</label>
      <input type="email" id="email" placeholder="Enter email" name="email">
      <label for="pwd">Password:</label>
      <input type="password" id="pwd" placeholder="Enter password" name="pswd"> -->
      <!-- <label>
        <input type="checkbox" name="remember"> Remember me
      </label> -->
    </div>

    <p class="gg_option_title">Data Tags: </p>

    <label><input type='checkbox' id="game_id" name="game_id" value="1" checked="checked" /> Game ID </label>
    <label><input type='checkbox' id="game_type" name="game_type" value="1" checked="checked" /> Game Type</label>
    <label><input type='checkbox' id="user_id" name="user_id" value="1" checked="checked" /> User ID</label>
    <label><input type='checkbox' id="user_res" name="user_res" value="1" checked="checked" /> User Result</label>
    <label><input type='checkbox' id="bot_res" name="bot_res" value="1" checked="checked" /> Bot Result</label>
    <label><input type='checkbox' id="winner" name="winner" value="1" checked="checked" /> Winner</label>
    <label><input type='checkbox' id="discount" name="discount" value="1" checked="checked" /> Discount</label>
    <label><input type='checkbox' id="played_at" name="played_at" value="1" checked="checked" /> Played At</label>
  </div>

  <div class="gg_spin_option">
    <button type="submit" id="gg_spin_download_btn" value="download now" class="button button-primary">
      Download Report (CSV Format)
    </button>
  </div>

</form>