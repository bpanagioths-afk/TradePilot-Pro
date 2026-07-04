# D-005

## One Trade belongs to One MT5 Account

Status: ACCEPTED

Decision

Κάθε MT5 imported trade πρέπει να ανήκει σε έναν συγκεκριμένο MT5 Account.

Reason

Αυτό είναι απαραίτητο για:

* multi-account trading
* broker separation
* prop firm tracking
* portfolio analytics
* account-aware sync
* future SaaS isolation

Implementation Rule

Κάθε imported MT5 trade πρέπει να έχει:

```text
mt5\\\_account\\\_id
mt5\\\_ticket
imported\\\_from\\\_mt5 = true
is\\\_archived = false
```



